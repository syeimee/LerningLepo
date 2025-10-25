/**
 * WebGL capability check for 3D rendering support
 */

export interface WebGLCheckResult {
  supported: boolean;
  message?: string;
  context?: 'webgl' | 'webgl2' | 'experimental-webgl';
}

/**
 * Check if WebGL is supported on this device
 */
export function checkWebGLSupport(): WebGLCheckResult {
  if (typeof window === 'undefined') {
    return {
      supported: false,
      message: 'サーバーサイドではWebGLを確認できません。',
    };
  }

  try {
    const canvas = document.createElement('canvas');

    // Try WebGL 2 first
    let gl = canvas.getContext('webgl2') as WebGLRenderingContext | null;
    if (gl) {
      return checkWebGLCapabilities(gl, 'webgl2');
    }

    // Try WebGL 1
    gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (gl) {
      return checkWebGLCapabilities(gl, 'webgl');
    }

    // Try experimental WebGL (older browsers)
    gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (gl) {
      return checkWebGLCapabilities(gl, 'experimental-webgl');
    }

    return {
      supported: false,
      message: 'お使いのデバイスは3D表示に対応していません。',
    };
  } catch {
    return {
      supported: false,
      message: '3D表示の初期化に失敗しました。',
    };
  }
}

/**
 * Check WebGL capabilities for minimum requirements
 */
function checkWebGLCapabilities(
  gl: WebGLRenderingContext,
  context: 'webgl' | 'webgl2' | 'experimental-webgl'
): WebGLCheckResult {
  // Check maximum texture size (important for Fire tablets)
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  if (maxTextureSize < 1024) {
    return {
      supported: false,
      message: 'デバイスの性能が不足しています。',
    };
  }

  // All checks passed
  return {
    supported: true,
    context,
  };
}

/**
 * Get WebGL info for debugging
 */
export function getWebGLInfo(): Record<string, string | number> {
  if (typeof window === 'undefined') return {};

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) return { error: 'WebGL not supported' };

  const glContext = gl as WebGLRenderingContext;

  return {
    vendor: glContext.getParameter(glContext.VENDOR),
    renderer: glContext.getParameter(glContext.RENDERER),
    version: glContext.getParameter(glContext.VERSION),
    shadingLanguageVersion: glContext.getParameter(glContext.SHADING_LANGUAGE_VERSION),
    maxTextureSize: glContext.getParameter(glContext.MAX_TEXTURE_SIZE),
    maxVertexAttributes: glContext.getParameter(glContext.MAX_VERTEX_ATTRIBS),
    maxVaryingVectors: glContext.getParameter(glContext.MAX_VARYING_VECTORS),
    maxFragmentUniforms: glContext.getParameter(glContext.MAX_FRAGMENT_UNIFORM_VECTORS),
    maxVertexUniforms: glContext.getParameter(glContext.MAX_VERTEX_UNIFORM_VECTORS),
  };
}

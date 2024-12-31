/** @type {import('next').NextConfig} */
const nextConfig = {
    // 必要に応じて他の設定を追加
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: 'raw-loader',
      });
  
      return config;
    },
};

export default nextConfig;

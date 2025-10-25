'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

interface ExportLoadingModalProps {
  open: boolean
  onClose: () => void
  onCancel?: () => void
  status: 'loading' | 'success' | 'error'
  progress?: number // 0-100
  message?: string
  errorMessage?: string
}

export default function ExportLoadingModal({
  open,
  onClose,
  onCancel,
  status,
  progress,
  message = 'Google Sheetsに出力中...',
  errorMessage,
}: ExportLoadingModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={status === 'loading' ? undefined : onClose}
      disableEscapeKeyDown={status === 'loading'}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {status === 'loading' && 'Google Sheetsに出力中'}
        {status === 'success' && '出力完了'}
        {status === 'error' && '出力エラー'}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
          {status === 'loading' && (
            <>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="body1" gutterBottom>
                {message}
              </Typography>
              {progress !== undefined && (
                <Box sx={{ width: '100%', mt: 2 }}>
                  <LinearProgress variant="determinate" value={progress} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                    {progress}% 完了
                  </Typography>
                </Box>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                この処理には数分かかる場合があります
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Google Sheetsへの出力が完了しました
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                操作の<FileDownloadIcon />ボタンから出力されたスプレッドシートを表示できます
              </Typography>
            </>
          )}

          {status === 'error' && (
            <>
              <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                出力に失敗しました
              </Typography>
              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errorMessage}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                もう一度お試しください
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        {status === 'loading' && onCancel && (
          <Button startIcon={<CancelIcon />} onClick={handleCancel} color="error">
            キャンセル
          </Button>
        )}
        {status !== 'loading' && (
          <Button onClick={onClose} variant="contained">
            閉じる
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

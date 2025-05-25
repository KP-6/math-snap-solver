import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Camera, Upload, Image } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { OCR } from './ocr'

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  onUploadSuccess?: () => void
}

export function FileUpload({ onFileSelect, onUploadSuccess }: FileUploadProps) {
  const { toast } = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFile = (file: File) => {
    try {
      setIsLoading(true)
      setSelectedFile(file)
      if (onFileSelect) {
        onFileSelect(file)
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
      onUploadSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      video.play()
      
      await new Promise(resolve => video.onloadedmetadata = resolve)
      
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'photo.png', { type: 'image/png' })
          handleFile(file)
        } else {
          toast({
            title: "Error",
            description: "Failed to create image",
            variant: "destructive",
          })
        }
      }, 'image/png')
      
      stream.getTracks().forEach(track => track.stop())
      video.remove()
      canvas.remove()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access camera",
        variant: "destructive",
      })
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragging(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
          handleFile(files[0])
        }
      }}
      className={`transition-all duration-200 ${isDragging ? 'bg-primary/10' : ''}`}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative aspect-square w-32">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Loader2 className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1 text-center">
                  <h3 className="text-sm font-medium">Drag & Drop</h3>
                  <p className="text-sm text-muted-foreground">
                    or click to upload
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e: Event) => {
                  const target = e.target as HTMLInputElement
                  const file = target.files?.[0]
                  if (file) {
                    handleFile(file)
                  }
                }
                input.click()
              }}
            >
              <Loader2 className="mr-2 h-4 w-4" />
              Select File
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCameraClick}
            >
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
            {selectedFile && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setSelectedFile(null)
                  if (onFileSelect) {
                    onFileSelect(null as unknown as File)
                  }
                  toast({
                    title: "Cleared",
                    description: "File has been cleared",
                  })
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      {previewImage && (
        <OCR
          imageSrc={previewImage}
          onTextChange={(text: string) => {
            // In a real app, you might want to do something with the extracted text
            console.log('Extracted text:', text)
          }}
        />
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import { createContext, useContext, useCallback, useState, useEffect } from "react"
import { Toast, ToastDescription, ToastProvider, ToastTitle } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  duration?: number
  variant?: "default" | "destructive"
}

interface ToastProps {
  open: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  duration?: number
  variant?: "default" | "destructive"
  removeId?: NodeJS.Timeout
}

interface ToastContextType {
  queueToast: (props: ToastProps) => void
}

const toastContext = createContext<ToastContextType>({
  queueToast: () => {},
})

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [currentToast, setCurrentToast] = useState<ToastProps>({
    open: false,
    title: undefined,
    description: undefined,
    action: undefined,
    duration: 5000,
    variant: "default",
    removeId: undefined,
  })
  const [queue, setQueue] = useState<ToastProps[]>([])

  useEffect(() => {
    return () => {
      const timeoutId = currentToast.removeId
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentToast.removeId])

  const queueToast = useCallback((props: ToastProps) => {
    if (queue.length >= TOAST_LIMIT) {
      return
    }

    const newQueue = [...queue, { ...props, open: true }]
    setQueue(newQueue)

    // Process the queue
    if (currentToast.open) {
      const timeoutId = currentToast.removeId
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      setCurrentToast(prev => ({
        ...props,
        open: true,
        removeId: setTimeout(() => {
          setCurrentToast(prev => ({
            open: false,
            title: undefined,
            description: undefined,
            action: undefined,
            duration: 5000,
            variant: "default",
            removeId: undefined,
          }))
          if (newQueue.length > 0) {
            const nextToast = newQueue.shift()
            if (nextToast) {
              queueToast(nextToast)
            }
          }
        }, TOAST_REMOVE_DELAY) as unknown as NodeJS.Timeout,
      }))
    } else {
      setCurrentToast(prev => ({
        ...props,
        open: true,
        removeId: setTimeout(() => {
          setCurrentToast(prev => ({
            open: false,
            title: undefined,
            description: undefined,
            action: undefined,
            duration: 5000,
            variant: "default",
            removeId: undefined,
          }))
          if (newQueue.length > 0) {
            const nextToast = newQueue.shift()
            if (nextToast) {
              queueToast(nextToast)
            }
          }
        }, TOAST_REMOVE_DELAY) as unknown as NodeJS.Timeout,
      }))
    }
  }, [currentToast, queue])

  return (
    <toastContext.Provider
      value={{
        queueToast,
      }}
    >
      <ToastProvider>
        {currentToast.open && (
          <Toast
            open={currentToast.open}
            onOpenChange={(open) => {
              if (!open) {
                setCurrentToast(prev => ({
                  open: false,
                  title: undefined,
                  description: undefined,
                  action: undefined,
                  duration: 5000,
                  variant: "default",
                  removeId: undefined,
                }))
              }
            }}
            duration={currentToast.duration || 5000}
            className={`glass-card shadow-lg border backdrop-blur-sm ${currentToast.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background"}`}
          >
            <div className="grid gap-1">
              {currentToast.title && <ToastTitle className="text-primary/90">{currentToast.title}</ToastTitle>}
              {currentToast.description && (
                <ToastDescription className="text-muted-foreground text-sm">
                  {currentToast.description}
                </ToastDescription>
              )}
            </div>
          </Toast>
        )}
      </ToastProvider>
      {children}
    </toastContext.Provider>
  )
}

export const toast = {
  success(description: string, options?: ToastOptions) {
    const context = useContext(toastContext)
    if (context) {
      context.queueToast({
        title: "Success",
        description,
        variant: "default",
        open: true,
        ...options,
      })
    }
  },
  error(description: string, options?: ToastOptions) {
    const context = useContext(toastContext)
    if (context) {
      context.queueToast({
        title: "Error",
        description,
        variant: "destructive",
        open: true,
        ...options,
      })
    }
  },
  info(description: string, options?: ToastOptions) {
    const context = useContext(toastContext)
    if (context) {
      context.queueToast({
        title: "Info",
        description,
        variant: "default",
        open: true,
        ...options,
      })
    }
  },
  warning(description: string, options?: ToastOptions) {
    const context = useContext(toastContext)
    if (context) {
      context.queueToast({
        title: "Warning",
        description,
        variant: "destructive",
        open: true,
        ...options,
      })
    }
  },
  toast(props: ToastProps) {
    const context = useContext(toastContext)
    if (context) {
      context.queueToast({
        ...props,
        open: true
      })
    }
  },
}

export function useToast() {
  const context = useContext(toastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToasterProvider")
  }
  return {
    toast: (props: ToastProps) => {
      context.queueToast({
        ...props,
        open: true
      })
    },
    success: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: "Success",
        description,
        variant: "default",
        open: true,
        ...options,
      })
    },
    error: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: "Error",
        description,
        variant: "destructive",
        open: true,
        ...options,
      })
    },
    info: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: "Info",
        description,
        variant: "default",
        open: true,
        ...options,
      })
    },
    warning: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: "Warning",
        description,
        variant: "destructive",
        open: true,

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [currentToast, setCurrentToast] = useState<ToastProps>({} as ToastProps);
  const [queue, setQueue] = useState<ToastProps[]>([]);

  useEffect(() => {
    return () => {
      const timeoutId = currentToast.removeId as unknown as NodeJS.Timeout;
      clearTimeout(timeoutId);
    };
  }, [currentToast.removeId]);

  const queueToast = useCallback((props: ToastProps) => {
    if (queue.length >= TOAST_LIMIT) {
      return;
    }

    const newQueue = [...queue, props];
    setQueue(newQueue);

    // Process the queue
    if (currentToast.open) {
      const timeoutId = currentToast.removeId as unknown as NodeJS.Timeout;
      clearTimeout(timeoutId);

      setCurrentToast({
        ...props,
        open: true,
        removeId: setTimeout(() => {
          setCurrentToast({});
          if (newQueue.length > 0) {
            const nextToast = newQueue.shift();
            if (nextToast) {
              queueToast(nextToast);
            }
          }
        }, TOAST_REMOVE_DELAY) as unknown as number,
      });
    } else {
      setCurrentToast({
        ...props,
        open: true,
        removeId: setTimeout(() => {
          setCurrentToast({});
          if (newQueue.length > 0) {
            const nextToast = newQueue.shift();
            if (nextToast) {
              queueToast(nextToast);
            }
          }
        }, TOAST_REMOVE_DELAY) as unknown as number,
      });
    }
  }, [currentToast, queue]);

  return (
    <toastContext.Provider value={{ queueToast }}>
      <ToastProvider>
        {currentToast.open && (
          <Toast
            open={currentToast.open}
            onOpenChange={(open) => {
              if (!open) {
                setCurrentToast({});
              }
            }}
            duration={currentToast.duration || 5000}
            className={`glass-card shadow-lg border backdrop-blur-sm ${
              currentToast.variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-background'
            }`}
          >
            <div className="grid gap-1">
              {currentToast.title && (
                <ToastTitle className="text-primary/90">
                  {currentToast.title}
                </ToastTitle>
              )}
              {currentToast.description && (
                <ToastDescription className="text-muted-foreground text-sm">
                  {currentToast.description}
                </ToastDescription>
              )}
            </div>
          </Toast>
        )}
      </ToastProvider>
      {children}
    </toastContext.Provider>
  );
}

export const toast = {
  success(description: string, options?: ToastOptions) {
    const context = useContext(toastContext);
    if (context) {
      context.queueToast({
        title: 'Success',
        description,
        variant: 'default',
        ...options,
      });
    }
  },
  error(description: string, options?: ToastOptions) {
    const context = useContext(toastContext);
    if (context) {
      context.queueToast({
        title: 'Error',
        description,
        variant: 'destructive',
        ...options,
      });
    }
  },
  info(description: string, options?: ToastOptions) {
    const context = useContext(toastContext);
    if (context) {
      context.queueToast({
        title: 'Info',
        description,
        variant: 'default',
        ...options,
      });
    }
  },
  warning(description: string, options?: ToastOptions) {
    const context = useContext(toastContext);
    if (context) {
      context.queueToast({
        title: 'Warning',
        description,
        variant: 'destructive',
        ...options,
      });
    }
  },
  toast(props: ToastProps) {
    const context = useContext(toastContext);
    if (context) {
      context.queueToast(props);
    }
  },
};

export function useToast() {
  const context = useContext(toastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToasterProvider');
  }
  return {
    toast: (props: ToastProps) => {
      context.queueToast(props);
    },
    success: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: 'Success',
        description,
        variant: 'default',
        ...options,
      });
    },
    error: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: 'Error',
        description,
        variant: 'destructive',
        ...options,
      });
    },
    info: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: 'Info',
        description,
        variant: 'default',
        ...options,
      });
    },
    warning: (description: string, options?: ToastOptions) => {
      context.queueToast({
        title: 'Warning',
        description,
        variant: 'destructive',
        ...options,
      });
    },
  };
}

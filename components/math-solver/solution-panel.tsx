import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface SolutionPanelProps {
  problemText?: string
}

export function SolutionPanel({ problemText }: SolutionPanelProps) {
  const [isSolving, setIsSolving] = useState(false)
  const [solution, setSolution] = useState<string[]>([])
  const { toast } = useToast()

  const handleSolve = async () => {
    if (!problemText) return

    setIsSolving(true)
    try {
      // TODO: Implement Gemini 1.5 Pro solution generation
      // This is a placeholder implementation
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: problemText }),
      })

      if (!response.ok) throw new Error('Failed to solve')

      const data = await response.json()
      setSolution(data.steps)

      toast({
        title: "Success",
        description: "Problem solved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to solve the problem",
        variant: "destructive",
      })
    } finally {
      setIsSolving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSolve}
              disabled={isSolving || !problemText}
              className="w-full md:w-auto"
            >
              {isSolving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Solving...
                </>
              ) : (
                'Solve Problem'
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {solution.length > 0 ? (
              <div className="math-solution">
                <ol className="step-by-step">
                  {solution.map((step, index) => (
                    <li key={index} className="space-y-2">
                      <div className="font-medium">Step {index + 1}:</div>
                      <div
                        className="katex"
                        dangerouslySetInnerHTML={{ __html: step }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Click "Solve Problem" to get the solution
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

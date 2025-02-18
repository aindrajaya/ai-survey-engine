"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

type Props = {
  formId: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const ChartsDisplay = ({ formId }: Props) => {
  const [form, setForm] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFormData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/form-data?formId=${formId}`)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setForm(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFormData()
  }, [formId])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error}</div>
  if (!form) return <div>No data available</div>

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Charts for: {form.name}</h2>

      {form.questions.map((question: any) => (
        <div key={question.id} className="mb-8">
          <h3 className="text-lg font-medium mb-2">{question.text}</h3>

          {(question.fieldType === "RadioGroup" || question.fieldType === "Select") && (
            <div className="h-[300px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={question.fieldOptions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="text" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {(question.fieldType === "RadioGroup" || question.fieldType === "Select") && (
            <div className="h-[300px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={question.fieldOptions}
                    dataKey="count"
                    nameKey="text"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {question.fieldOptions.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChartsDisplay


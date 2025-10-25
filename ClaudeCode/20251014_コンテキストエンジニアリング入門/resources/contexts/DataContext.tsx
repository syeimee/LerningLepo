'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  lessons as initialLessons,
  dailyReports as initialDailyReports,
  type Lesson,
  type DailyReport,
} from '@/lib/data'

interface DataContextType {
  lessons: Lesson[]
  dailyReports: DailyReport[]
  addLesson: (lesson: Lesson) => void
  updateLesson: (id: string, updates: Partial<Lesson>) => void
  addDailyReport: (report: DailyReport) => void
  updateDailyReport: (id: string, updates: Partial<DailyReport>) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
  const [dailyReports, setDailyReports] = useState<DailyReport[]>(initialDailyReports)

  const addLesson = (lesson: Lesson) => {
    setLessons((prev) => [...prev, lesson])
  }

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setLessons((prev) => prev.map((lesson) => (lesson.id === id ? { ...lesson, ...updates } : lesson)))
  }

  const addDailyReport = (report: DailyReport) => {
    setDailyReports((prev) => [report, ...prev])
    // 日報が作成されたら、対応する授業のステータスをCOMPLETEDに変更
    updateLesson(report.lessonId, { status: 'COMPLETED' })
  }

  const updateDailyReport = (id: string, updates: Partial<DailyReport>) => {
    setDailyReports((prev) => prev.map((report) => (report.id === id ? { ...report, ...updates } : report)))
  }

  return (
    <DataContext.Provider
      value={{
        lessons,
        dailyReports,
        addLesson,
        updateLesson,
        addDailyReport,
        updateDailyReport,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

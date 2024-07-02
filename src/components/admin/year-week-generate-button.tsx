import React from 'react'
import { Button } from '../ui/button'
import useYearWeek from './useYearWeek'
import YearWeekSelector from './year-week-selector'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '../ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import Typography from '../common/typography'

const YearWeekGenerateButton = () => {
    const {currentYear, currentWeek} = useYearWeek()
    const {data: yearWeek} = useQuery({queryKey: ["year_week", currentYear, currentWeek], queryFn: async () => {
        const {data, error} = await supabase
        .from("year_week")
        .select("*")
        .eq("year", currentYear)
        .eq("week", currentWeek).limit(1);
        if(error){throw error} return data
    }})
    const supabase = createClient()
    const {toast} = useToast()
    
    const createYearWeek =async () => { 
        try {
            const {error} =await supabase.from("year_week").insert([{
                year: currentYear,
                week: currentWeek
            }])
        if(!error){
            toast({title: `${currentYear}년 ${currentWeek}주차 데이터 생성 완료`})
        }
        } catch (error) {
            toast({title: `${currentYear}년 ${currentWeek}주차 데이터 생성 실패`,variant:"destructive"})
        }
     }

  return (
    <section className="flex flex-col gap-y-2">
        <div className='flex justify-between'>
            <Typography variant={'p'} typo={'lead'}>
            주차 데이터 생성
            </Typography>
            <YearWeekSelector/>
            </div>

            <Button onClick={createYearWeek} disabled={Array.isArray(yearWeek) && yearWeek.length===1}>
                {currentYear}년 {currentWeek}주차 생성하기
            </Button>
    </section>
  )
}

export default YearWeekGenerateButton
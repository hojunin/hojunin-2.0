'use client';
import useYearWeek from '@/components/admin/useYearWeek';
import Typography from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@/lib/supabase/client';
import React from 'react';

const MemoirDetailAdminPage = ({ params }: { params: { type: string } }) => {
	const supabase = createClient()
	const {currentYear, currentWeek} = useYearWeek()
	const {toast} = useToast()

	const getMetaData = async () => { 
		const {data : yearWeek} = await supabase.from("year_week").select("*").eq("year" ,currentYear).eq("week",currentWeek).limit(1)
		const {data: typeData} = await supabase.from("memoir_type").select("*").eq("value", params.type).limit(1)
		if(!(Array.isArray(yearWeek) && yearWeek.length===1 && Array.isArray(typeData) && typeData.length===1)){
			throw Error("데이터가 충분하지 않습니다")
		}

		return {
			yearWeekId: yearWeek[0].id,
			typeId: typeData[0].id
		}
	 }

	const createMemoir = async () => { 
		const {yearWeekId, typeId} = await getMetaData()

		const {data,error} =await supabase.from("memoir").insert({
			year_week: yearWeekId,
			type: typeId,
			title: "헤헤",
			meta: {
				money: 50500
			}
		})
		if(error){
			toast({title: "에러 발생", description: error.message, variant:"destructive"})
		}
	 }
	 const updateMemoir = () => { 

	  }
	return <div className='grid'>
		<Typography>
		{params.type}
			</Typography> 
			
			<Button onClick={createMemoir}>
생성하기
			</Button>
		</div>;
};

export default MemoirDetailAdminPage;

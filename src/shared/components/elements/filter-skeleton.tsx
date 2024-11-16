import React from 'react';
import {Skeleton} from "@/shared/components/ui/skeleton";

interface IPropsFilterSkeleton {
    isMedia: boolean
}
export const FilterSkeleton: React.FC<IPropsFilterSkeleton> = ({isMedia}) => {
    return (
        <div className='w-[320px] flex flex-col gap-4 '>
            <Skeleton className='w-full h-[50px] rounded'/>
            <Skeleton className='w-full h-[50px]   rounded'/>
            <Skeleton className='w-full h-[50px]  rounded'/>
            <Skeleton className='w-full h-[50px]  rounded'/>
            <Skeleton className='w-full h-[50px]  rounded'/>
            <Skeleton className='w-full h-[50px]  rounded'/>
            <Skeleton className='w-full h-[50px]  rounded'/>
        </div>
    );
};

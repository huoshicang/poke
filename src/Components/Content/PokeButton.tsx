'use client'

import {FetchTypeComponent} from "@/fetchData/fetchType";
import React, {useEffect} from "react";
import {useSearchParams, useRouter} from 'next/navigation';

import {SelectItemType} from "@/types/types";
import {PokeButtonProps} from "@/types/PropsType";


export default function PokeButton({selectedList, setSelectedList,}: PokeButtonProps) {
  // 获取URL参数
  const searchParams = useSearchParams();
  const router = useRouter();


  const setRouter = () => {
    // 创建一个URLSearchParams对象
    const params = new URLSearchParams(searchParams);

    params.set('type', selectedList.map(item => item.name).join('&'));

    // 保留其他参数
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'type') {
        params.set(key, value);
      }
    }
    // 更新URL
    router.replace(`?${params.toString()}`);
  }


  // 初始化
  useEffect(() => setRouter(), [selectedList]);


  // 切换选择
  const handleSelect = (item: SelectItemType) => {
    // 切换选择类型
    setSelectedList((prev: SelectItemType[]) => {
      const isItemInPrev = prev.some(prevItem => prevItem.name === item.name);

      if (isItemInPrev) {
        // 如果item存在，移除它
        return prev.filter(prevItem => prevItem.name !== item.name);
      } else {
        // 如果item不存在，添加它
        return [...prev, item];
      }

    });


  }


  return (
    <div className="p-2 m-2">
      Types：<FetchTypeComponent
      selectItem={selectedList}
      onSelect={(item: SelectItemType) => handleSelect(item)}
    />
    </div>
  );
}

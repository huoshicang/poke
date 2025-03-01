import React, {useState, useEffect} from 'react';
import {SelectItemType} from "@/types/types";
import {FetchTypeProps} from "@/types/PropsType";


export const FetchTypeComponent: React.FC<FetchTypeProps> = ({selectItem, onSelect}) => {

  // 数据
  const [data, setData] = useState<SelectItemType[] | null>(null);

  // 加载
  const [loading, setLoading] = useState(true);

  // 错误
  const [error, setError] = useState<string | null>(null);


  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');

        const result = await response.json();
        setData(result.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : '发生未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div>
      {
        data?.map((item) => (
          <button
            key={item.name}
            className={`p-2 m-2 ${selectItem.some(prevItem => prevItem.name === item.name) ? 'bg-blue-500' : 'bg-gray-200'}`}
            onClick={() => onSelect(item)}
          >
            {item.name}
          </button>
        ))
      }

    </div>
  );
};

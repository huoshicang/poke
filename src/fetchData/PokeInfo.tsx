import React, {useState, useEffect} from 'react';

import {FetchPokeInfoProps} from "@/types/PropsType";


export const FetchPokeInfoComponent: React.FC<FetchPokeInfoProps> = ({pokemonUrl}) => {

  // 数据
  const [data, setData] = useState<{
    id: number,
    name: string,
    url: string,
  } | null>(null);

  // 加载
  const [loading, setLoading] = useState(true);

  // 错误
  const [error, setError] = useState<string | null>(null);


  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(pokemonUrl);

        const result = await response.json();
        setData({
          id: result.id,
          name: result.name,
          url: result.sprites.front_default,
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : '发生未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //
  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center justify-between border p-4">
      <h3>{data?.name}</h3>
      <img src={data?.url} alt={data?.name} width="35" height="35"/>
      <p>Number: {data?.id}</p>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { PokeInfoType, SelectItemType } from "@/types/types";
import { FetchInfoProps } from "@/types/PropsType";
import { FetchPokeInfoComponent } from "@/fetchData/PokeInfo";

export const FetchInfoComponent: React.FC<FetchInfoProps> = ({ selectedList, setTotal }) => {

  // 数据
  const [data, setData] = useState<PokeInfoType[]>([]);

  // 加载
  const [loading, setLoading] = useState(true);

  // 错误
  const [error, setError] = useState<string | null>(null);

  // 获取URL中的页码参数
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 20;

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 重置数据
        setLoading(true);
        setData([]);
        setTotal(0);

        selectedList.map(async (item: SelectItemType) => {
          const response = await fetch(item.url);
          const result = await response.json();

          // 设置总数
          setTotal((prev: number) => prev + result.pokemon.length);

          // 设置数据
          result.pokemon.map((item: {
            pokemon: PokeInfoType
            slot: number
          }) => {
            setData((prev: PokeInfoType[]) => {
              return [...prev, item.pokemon];
            });
          });
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : '发生未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [selectedList, currentPage]); // 添加currentPage依赖

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>loading...</div>;

  // 计算当前页的数据
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-6 gap-x-16 gap-y-6">
        {paginatedData.map((item: PokeInfoType, index: number) => (
          <FetchPokeInfoComponent key={index} pokemonUrl={item.url} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => { /* 上一页逻辑 */ }}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => { /* 下一页逻辑 */ }}>Next</button>
      </div>
    </div>
  );
};

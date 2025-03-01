import {useEffect, useState} from 'react';
import {PokeInfoType, SelectItemType} from "@/types/types";
import {FetchInfoProps} from "@/types/PropsType";
import {FetchPokeInfoComponent} from "@/fetchData/PokeInfo";
import {useRouter, useSearchParams} from "next/navigation";
import PokeFooter from "@/Components/PokeFooter";

export const FetchInfoComponent: React.FC<FetchInfoProps> = ({selectedList, setTotal}) => {

  // 数据
  const [data, setData] = useState<PokeInfoType[]>([]);

  // 加载
  const [loading, setLoading] = useState<boolean>(true);

  // 错误
  const [error, setError] = useState<string | null>(null);

  // 获取URL中的页码参数

  const searchParams = useSearchParams();
  const router = useRouter();

  // 当前页码，获取每页数量
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 获取数据
  useEffect(() => {

    // 创建一个URLSearchParams对象
    const params = new URLSearchParams(searchParams);
    
    // 确保type参数存在
    if (selectedList.length > 0) {
      params.set('type', selectedList.map(item => item.name).join(','));
    }
    
    // 设置页码
    params.set('page', currentPage.toString());
    
    // 更新URL
    router.replace(`?${params.toString()}`);

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
  const paginatedData = data.slice((currentPage - 1) * 24, currentPage * 24);

  return (
    <div>
      <div className="grid grid-cols-6 gap-x-16 gap-y-6">
        {paginatedData.map((item: PokeInfoType, index: number) => (
          <FetchPokeInfoComponent key={index} pokemonUrl={item.url}/>
        ))}
      </div>
      <PokeFooter currentPage={currentPage} setCurrentPage={setCurrentPage} total={data.length} />
    </div>
  );
};

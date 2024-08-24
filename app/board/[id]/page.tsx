"use client";
import { client } from "@/app/appwrite";
import { Databases, Models, Query } from "appwrite";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const databases = new Databases(client);

const BoardView = () => {
  const [items, setItems] = useState<Models.Document[]>([]);
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string; // Получаем последний элемент из пути после последнего слэша

  // Функция для получения и установки данных
  const fetchItems = async () => {
    try {
      const response = await databases.listDocuments(
        "6695b81f00147290ae3c",
        "6695b822002ec71bae07",
        [Query.equal("restaurantId", id)]
      );
      setItems(response.documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [
        "databases.6695b81f00147290ae3c.collections.6695b822002ec71bae07.documents",
        "databases.6695b81f00147290ae3c.collections.hb.documents",
      ],
      (response) => {
        console.log("Realtime update:", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          // Обновление состояния при получении новых данных
          fetchItems();
        }
      }
    );
    // Очистка подписки при размонтировании компонента
    return () => {
      unsubscribe();
    };
  }, []);

  // Получение данных при первом рендере
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col  min-h-screen">
      <div className="flex flex-row items-center h-16 border-b-2">
        <div className="flex-1 flex items-center justify-center text-center text-5xl font-bold border-r h-full">
          Готово
        </div>
        <div className="flex-1 flex items-center justify-center text-center text-5xl font-bold border-l h-full">
          В ожидании
        </div>
      </div>
      <div className="flex flex-row  flex-1 ">
        <div className="w-full grid grid-rows-6 grid-cols-3 grid-flow-row  border-r">
          {items.filter((item) => item.status).length > 0 ? (
            <ItemList items={items.filter((item) => item.status)} />
          ) : (
            <div></div>
          )}
        </div>
        <div className="w-full grid grid-rows-6 grid-cols-3 grid-flow-row border-l">
          {items.filter((item) => !item.status).length > 0 ? (
            <ItemList items={items.filter((item) => !item.status)} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center h-14 border-t-2">
        <p className="text-2xl font-medium">
          powered by Lei Sheng Business Solutions
        </p>
      </div>
    </div>
  );
};

type ItemListProps = {
  items: Models.Document[];
};

const ItemList = ({ items }: ItemListProps) => (
  <>
    {items.map((item) => (
      <div
        key={item.$id}
        className={`text-7xl font-bold  w-[182px] h-16  ${
          item.status ? "text-green-500" : ""
        }`}
      >
        B-{item.orderId}
      </div>
    ))}
  </>
);

export default BoardView;

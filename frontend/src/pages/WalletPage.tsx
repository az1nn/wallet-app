import React from "react";
import Layout from "../components/Layout/Layout";
import { Card } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { AxiosClient } from "../utils/AxiosClient";

const WalletPage = () => {
  const mockData = {
    id: 1,
    userId: 1,
    balance: 199,
    bank: "bradesco",
    lastChange: "",
  };

  const dataArray = [mockData, mockData, mockData, mockData];

  const { data, isLoading } = useQuery({
    queryFn: () => AxiosClient.get("http://127.0.0.1:5254/api/wallets"),
    queryKey: ["wallets"],
  });

  return (
    <Layout>
      <div className="w-full h-full text-center flex justify-start items-center flex-wrap flex-col">
        <h1 className="w-full text-3xl font-bold text-white mt-8 mb-4">
          Wallets
        </h1>
        <div className="w-full flex justify-center">
          <h2 className="w-1/5 rounded font-bold bg-blue-500 p-2 text-white">
            <a href="/add-wallet">Adicionar nova carteira</a>
          </h2>
        </div>
        <div className="w-2/3 flex flex-wrap justify-center gap-14 my-8 flex-row">
          {!isLoading &&
            data &&
            data.data.map((item) => {
              return (
                <Card className="w-[40%] rounded shadow p-2 text-left">
                  <p>
                    <b>UserID:</b> {item.userId}
                  </p>
                  <p>
                    <b>Bank:</b> {item.bank}
                  </p>
                  <p>
                    <b>Balance:</b> R${item.balance}
                  </p>
                </Card>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;

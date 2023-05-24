import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Button, Label, TextInput } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosClient } from "../utils/AxiosClient";
import { useNavigate } from "@tanstack/router";

const AddWalletPage = () => {
  const [formData, setFormData] = useState({
    userId: 0,
    balance: 0,
    bank: "",
    lastChange: "2023-05-25T03:16",
  });

  const navigate = useNavigate({ from: "/add-wallet" });

  function handleOnChange(evt) {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  }

  const mutation = useMutation({
    mutationFn: () =>
      AxiosClient.post("http://127.0.0.1:5254/api/wallet", formData),
    onSuccess: () => {
      navigate({ to: "/wallet" });
      window.location.reload();
    },
  });

  function handleRegister(e) {
    e.preventDefault();
    mutation.mutate();
  }
  return (
    <Layout>
      <form
        onSubmit={(e) => handleRegister(e)}
        method="POST"
        className="flex flex-col p-4 gap-4 w-1/3 bg-white rounded shadow text-center"
      >
        <h1 className="font-bold text-xl mb-2 mt-2 text-gray-900">
          Cadastrar nova carteira
        </h1>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="bank" value="Banco:" />
          </div>
          <TextInput
            id="bank"
            name="bank"
            type="text"
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="userId" value="ID do usuario:" />
          </div>
          <TextInput
            id="userId"
            name="userId"
            type="text"
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="balance" value="Saldo:" />
          </div>
          <TextInput
            id="balance"
            name="balance"
            type="number"
            step={10}
            min={0}
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <Button className="bg-blue-500 text-white p-2 mt-6" type="submit">
          Adicionar
        </Button>
      </form>
    </Layout>
  );
};

export default AddWalletPage;

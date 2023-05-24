import Layout from "../components/Layout/Layout";
import { Button, Label, TextInput } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosClient } from "../utils/AxiosClient";
import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    dateOfBirth: "",
  });

  function handleOnChange(evt) {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  }

  const mutation = useMutation({
    mutationFn: () =>
      AxiosClient.post("http://127.0.0.1:5254/api/user", formData),
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
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
          Cadastrar novo usuário
        </h1>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="cpf" value="CPF: (somente números)" />
          </div>
          <TextInput
            id="cpf"
            name="cpf"
            type="number"
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="fullName" value="Nome Completo" />
          </div>
          <TextInput
            id="fullName"
            name="fullName"
            type="text"
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="dateOfBirth" value="Data de Nascimento:" />
          </div>
          <TextInput
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <Button className="bg-blue-500 text-white p-2 mt-6" type="submit">
          Registrar
        </Button>
        <div className="mx-6 text-blue-500">
          <a href="/login">Voltar ao login</a>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterPage;

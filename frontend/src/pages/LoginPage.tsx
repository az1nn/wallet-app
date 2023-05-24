import { Button, Label, TextInput } from "flowbite-react";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosClient } from "../utils/AxiosClient";
import { redirect, useNavigate } from "@tanstack/router";
import { Router } from "@tanstack/router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    cpf: "",
  });
  const navigate = useNavigate({ from: "/login" });

  function handleOnChange(evt) {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  }

  const mutation = useMutation({
    mutationFn: () =>
      AxiosClient.post("http://127.0.0.1:5254/api/login", formData),
    onSuccess: () => {
      navigate({ to: "/wallet" });
      window.location.reload();
    },
  });

  function handleRegister(e) {
    e.preventDefault();
    console.log(formData);
    mutation.mutate();
  }

  return (
    <Layout>
      <form
        onSubmit={(e) => handleRegister(e)}
        method="POST"
        className="flex flex-col p-4 gap-4 w-1/3 bg-white rounded shadow text-center"
      >
        <h1 className="font-bold text-xl mb-2 mt-2 text-gray-900">Login</h1>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="cpf" value="CPF:" />
          </div>
          <TextInput
            id="cpf"
            name="cpf"
            type="password"
            required={true}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <Button className="bg-blue-500 text-white p-2 mt-6" type="submit">
          Login
        </Button>
        <div className="mx-6 text-blue-500">
          <a href="/register">Registrar novo usuário</a>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;

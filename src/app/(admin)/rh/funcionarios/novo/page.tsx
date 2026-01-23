import FuncionarioForm from "@/components/rh/FuncionarioForm";

export default function NovoFuncionarioPage() {
    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold">Novo Funcionário</h1>
                <p className="text-sm text-gray-500">Preencha os dados básicos e contratuais</p>
            </div>

            <FuncionarioForm />
        </div>
    );
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type DataType = {
  month: string;
  total: number;
};

export default function RegistrationsChart({ data }: { data: DataType[] }) {

  return (
    <div className="w-full">
    <h1 className="text-2xl font-bold text-slate-800 text-center">Registrations Chart</h1>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#6366f1" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}
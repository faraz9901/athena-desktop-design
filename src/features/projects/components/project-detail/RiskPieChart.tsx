import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const pieData = [
    { name: "Critical Path", value: 28 },
    { name: "Dependencies", value: 22 },
    { name: "Execution", value: 34 },
    { name: "Reporting", value: 16 },
]

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#38bdf8"]

export function RiskPieChart() {
    return (
        <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                    >
                        {pieData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                    />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{
                            fontSize: "12px",
                            opacity: 0.8
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

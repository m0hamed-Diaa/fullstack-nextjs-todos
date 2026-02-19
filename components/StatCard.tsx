import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: number;
    color?: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
    return (
        <Card className={`${color || "bg-blue-500"} text-white`}>
            <CardHeader>
                <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );
}

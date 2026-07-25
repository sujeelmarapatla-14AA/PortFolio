import { LiquidButton } from "@/app/components/ui/liquid-glass-button";

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-8 gap-8">
      <div className="text-center space-y-2 max-w-xl">
        <h1 className="text-4xl font-extrabold gradient-text">Liquid Glass UI Demo</h1>
        <p className="text-gray-400">Interactive specular reflection, liquid refraction, and glassmorphic button components.</p>
      </div>

      <div className="glass rounded-3xl p-10 flex flex-col items-center gap-6 max-w-2xl w-full border border-white/15 shadow-2xl">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LiquidButton variant="primary" size="lg">
            Primary Liquid Glass
          </LiquidButton>
          <LiquidButton variant="secondary" size="lg">
            Secondary Glass
          </LiquidButton>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <LiquidButton variant="outline" size="default">
            Outline Liquid
          </LiquidButton>
          <LiquidButton variant="destructive" size="default">
            Destructive Liquid
          </LiquidButton>
        </div>
      </div>
    </div>
  );
}
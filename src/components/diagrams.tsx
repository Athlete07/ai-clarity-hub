import { Layers, Box, Maximize, ArrowRight, Activity, Cpu, CheckCircle2 } from "lucide-react";
import type { ConceptBodyBlock } from "@/lib/concepts";

export function DiagramBlock({ block }: { block: Extract<ConceptBodyBlock, { kind: "diagram" }> }) {
  return (
    <div className="my-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-muted/20 px-5 py-3">
        <h4 className="flex items-center gap-2 text-[14px] font-semibold text-foreground">
          {block.type === "flow" && <Layers size={15} className="text-muted-foreground" />}
          {block.type === "nested" && <Maximize size={15} className="text-muted-foreground" />}
          {block.type === "comparison" && <Activity size={15} className="text-muted-foreground" />}
          {block.type === "tree" && <Cpu size={15} className="text-muted-foreground" />}
          {block.title}
        </h4>
        <p className="mt-1 leading-relaxed text-[12px] text-muted-foreground">{block.caption}</p>
      </div>

      <div className="overflow-x-auto p-6">
        {block.id === "ch1-dl-flow" && <FlowDiagram />}
        {block.id === "ch1-ai-hierarchy" && <NestedDiagram />}
        {block.id === "ch1-paradigm-shift" && <ComparisonDiagram />}
        {(block.id === "ch1-ml-decision-tree" || block.title === "Is it actually ML?") && (
          <TreeDiagram />
        )}

        {block.id === "ch2-training-loop" && <TrainingLoopFlow />}
        {block.id === "ch2-epochs-nested" && <EpochsNested />}
        {block.id === "ch2-fitting-comparison" && <FittingComparison />}
      </div>
    </div>
  );
}

function FlowDiagram() {
  const steps = [
    { title: "Raw Input Data", desc: "e.g., Image Pixels" },
    { title: "Layer 1", desc: "Detects basic edges & gradients" },
    { title: "Layer 2", desc: "Combines edges into textures & shapes" },
    { title: "Layer 3", desc: "Combines shapes into object parts" },
    { title: "Output Layer", desc: "Final classification (e.g., 'Car')" },
  ];

  return (
    <div className="flex w-full min-w-min max-w-[800px] flex-col items-center gap-3 sm:flex-row">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`flex h-[90px] w-[130px] flex-col items-center justify-center rounded-lg border p-3 text-center shadow-sm ${
                isLast
                  ? "border-purple bg-purple-light/50 text-purple-dark"
                  : "border-border bg-muted/10 text-foreground"
              }`}
            >
              <span className="text-[12px] font-medium">{step.title}</span>
              <span
                className={`mt-1 text-[10px] leading-tight ${isLast ? "text-purple-dark/80" : "text-muted-foreground"}`}
              >
                {step.desc}
              </span>
            </div>
            {!isLast && (
              <ArrowRight size={16} className="rotate-90 text-muted-foreground/50 sm:rotate-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function NestedDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      {/* AI Box */}
      <div className="rounded-xl border border-border bg-muted/10 p-5 pt-8">
        <div className="absolute left-6 top-4 text-[13px] font-bold text-foreground/80">
          Artificial Intelligence (AI)
        </div>
        <div className="mb-4 mt-1 pl-1 text-[11px] text-muted-foreground">
          Contains: Hand-coded rules, Expert systems, Search algorithms
        </div>

        {/* ML Box */}
        <div className="relative rounded-lg border border-border bg-muted/30 p-5 pt-8">
          <div className="absolute left-5 top-3 text-[13px] font-bold text-foreground">
            Machine Learning (ML)
          </div>
          <div className="mb-4 mt-1 pl-1 text-[11px] text-muted-foreground">
            Contains: Random Forests, Linear Regression, SVMs
          </div>

          {/* DL Box */}
          <div className="relative rounded-md border border-purple bg-purple-light/40 p-5 pt-8 shadow-sm">
            <div className="absolute left-4 top-3 text-[13px] font-bold text-purple-dark">
              Deep Learning (DL)
            </div>
            <div className="mt-1 pl-1 text-[11px] text-purple-dark/80">
              Contains: Neural Networks, Transformers (LLMs), CNNs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonDiagram() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-transparent p-5">
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Traditional Engineering Paradigm
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <div className="rounded border border-border bg-card px-3 py-2 font-medium text-foreground shadow-sm">
            Data + Hand-coded Rules
          </div>
          <ArrowRight size={16} className="text-muted-foreground/50" />
          <div className="rounded border border-dashed border-border bg-muted/30 px-3 py-2 text-muted-foreground">
            Execution Engine
          </div>
          <ArrowRight size={16} className="text-muted-foreground/50" />
          <div className="rounded border border-border bg-muted/10 px-3 py-2 font-medium text-foreground">
            Output Answers
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-transparent p-5">
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Machine Learning Paradigm
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <div className="rounded border border-border bg-card px-3 py-2 font-medium text-foreground shadow-sm">
            Data + Correct Answers
          </div>
          <ArrowRight size={16} className="text-muted-foreground/50" />
          <div className="rounded border border-dashed border-border bg-muted/30 px-3 py-2 text-muted-foreground">
            Training Algorithm
          </div>
          <ArrowRight size={16} className="text-purple/60" />
          <div className="rounded border border-purple bg-purple-light/50 px-3 py-2 font-medium text-purple-dark">
            Output Learned Rules
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeDiagram() {
  return (
    <div className="w-full text-[13px] font-medium">
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-border bg-muted/30 px-4 py-2 text-foreground">
          Does the system's logic update automatically based on new data?
        </div>
      </div>

      <div className="relative mt-4 pl-6">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-border"></div>

        {/* Branch 1 */}
        <div className="relative mb-6">
          <div className="absolute -left-3 top-3 w-4 border-t border-border"></div>
          <div className="flex items-start gap-2 pl-4">
            <span className="mt-0.5 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground shadow-sm">
              NO
            </span>
            <div>
              <div className="text-foreground/80">It is a Rule-Based System (Marketing AI).</div>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <ArrowRight size={12} /> Action: Treat as standard software.
              </div>
            </div>
          </div>
        </div>

        {/* Branch 2 */}
        <div className="relative">
          <div className="absolute -left-3 top-3 w-4 border-t border-border"></div>
          <div className="flex items-start gap-2 pl-4">
            <span className="mt-0.5 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-bold text-foreground shadow-sm">
              YES
            </span>
            <div className="w-full">
              <div className="text-foreground">
                Are the decision rules explicitly written by a human?
              </div>

              <div className="relative mt-4 pl-4">
                <div className="absolute bottom-0 left-2 top-0 w-px bg-border"></div>

                {/* Sub-branch 1 */}
                <div className="relative mb-6">
                  <div className="absolute -left-2 top-3 w-4 border-t border-border"></div>
                  <div className="flex items-start gap-2 pl-4">
                    <span className="mt-0.5 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-bold text-foreground shadow-sm">
                      YES
                    </span>
                    <div>
                      <div className="text-foreground/80">It is a dynamic Rule-Based System.</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <ArrowRight size={12} /> Action: Test boundary conditions manually.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-branch 2 */}
                <div className="relative">
                  <div className="absolute -left-2 top-3 w-4 border-t border-border"></div>
                  <div className="flex items-start gap-2 pl-4">
                    <span className="mt-0.5 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground shadow-sm">
                      NO
                    </span>
                    <div>
                      <div className="text-foreground">
                        It infers patterns directly from a training dataset.
                      </div>
                      <div className="mt-3 rounded-lg border border-purple bg-purple-light/40 p-3">
                        <div className="flex items-center gap-2 font-semibold text-purple-dark">
                          <CheckCircle2 size={14} /> Conclusion: True Machine Learning System.
                        </div>
                        <div className="mt-1 leading-relaxed text-[12px] text-purple-dark/80">
                          Action: Require an evaluation dataset, monitor for drift, and budget for
                          retraining pipelines.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainingLoopFlow() {
  const steps = [
    { title: "1. Forward Pass", desc: "Generates a prediction" },
    { title: "2. Loss Function", desc: "Calculates the error" },
    { title: "3. Backpropagation", desc: "Assigns the blame backwards" },
    { title: "4. Gradient Descent", desc: "Updates parameters to learn" },
  ];

  return (
    <div className="flex w-full min-w-min max-w-[800px] flex-col items-center gap-3 sm:flex-row">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`flex h-[90px] w-[130px] flex-col items-center justify-center rounded-lg border p-3 text-center shadow-sm ${
                isLast
                  ? "border-purple bg-purple-light/50 text-purple-dark"
                  : "border-border bg-muted/10 text-foreground"
              }`}
            >
              <span className="text-[12px] font-medium">{step.title}</span>
              <span
                className={`mt-1 text-[10px] leading-tight ${isLast ? "text-purple-dark/80" : "text-muted-foreground"}`}
              >
                {step.desc}
              </span>
            </div>
            {!isLast && (
              <ArrowRight size={16} className="rotate-90 text-muted-foreground/50 sm:rotate-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function EpochsNested() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      {/* Epoch Box */}
      <div className="rounded-xl border border-border bg-muted/10 p-5 pt-8">
        <div className="absolute left-6 top-4 text-[13px] font-bold text-foreground/80">Epoch</div>
        <div className="mb-4 mt-1 pl-1 text-[11px] text-muted-foreground">
          One full pass through the entire 1,000,000 row dataset.
        </div>

        {/* Batch Box */}
        <div className="relative rounded-lg border border-border bg-muted/30 p-5 pt-8">
          <div className="absolute left-5 top-3 text-[13px] font-bold text-foreground">Batch</div>
          <div className="mb-4 mt-1 pl-1 text-[11px] text-muted-foreground">
            A smaller chunk of data, e.g., 1,000 rows.
          </div>

          {/* Iteration Box */}
          <div className="relative rounded-md border border-purple bg-purple-light/40 p-5 pt-8 shadow-sm">
            <div className="absolute left-4 top-3 text-[13px] font-bold text-purple-dark">
              Iteration
            </div>
            <div className="mt-1 pl-1 text-[11px] text-purple-dark/80">
              Processing one batch and taking one step of gradient descent.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FittingComparison() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 rounded-xl border border-border bg-transparent p-5">
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Underfitting
        </div>
        <div className="rounded border border-border bg-card p-4 text-[13px] shadow-sm">
          <div className="font-medium text-foreground">Model is too simple</div>
          <div className="mt-2 text-muted-foreground">
            Fails to learn anything. Terrible accuracy on both training and test data.
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-purple bg-purple-light/20 p-5">
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-purple-dark">
          Optimal Fit
        </div>
        <div className="rounded border border-purple bg-purple-light/50 p-4 text-[13px] shadow-sm">
          <div className="font-medium text-purple-dark">Learns the pattern</div>
          <div className="mt-2 text-purple-dark/80">
            High accuracy on training data, and high accuracy on unseen test data.
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-border bg-transparent p-5">
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Overfitting
        </div>
        <div className="rounded border border-border bg-card p-4 text-[13px] shadow-sm">
          <div className="font-medium text-foreground">Memorizes the noise</div>
          <div className="mt-2 text-muted-foreground">
            Perfect accuracy on training data, but fails catastrophically on unseen test data.
          </div>
        </div>
      </div>
    </div>
  );
}

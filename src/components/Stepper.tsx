type StepperProps = {
  currentStep: number;
  maxStep: number;
};

type StepProps = {
  active: boolean;
};

export function Stepper(props: StepperProps) {
  const { currentStep, maxStep } = props;

  const stepProps: StepProps[] = [];

  for (let i = 0; i < maxStep; i++) {
    stepProps.push({
      active: currentStep >= i,
    });
  }

  return (
    <div className="mb-9">
      <div className="flex space-x-1">
        {stepProps.map((stepProps, index) => (
          <div
            key={index}
            className={`h-[2px] rounded-full transition-colors duration-200 ease-out ${
              stepProps.active ? "bg-white" : "bg-slate-800"
            } flex-1`}
          ></div>
        ))}
      </div>
      <div className="mt-2 text-neutral-500 text-sm leading-4">{`Step ${
        currentStep + 1
      } of ${maxStep}`}</div>
    </div>
  );
}

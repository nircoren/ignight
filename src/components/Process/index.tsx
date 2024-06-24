import ProcessList from "./ProcessList";

function Process() {
  return (
    <section
      id="process"
      className="anchor relative z-10 overflow-hidden pb-16 
    pt-[60px] md:pb-[60px] md:pt-[60px] xl:pb-[100px] xl:pt-[100px] 2xl:pb-[100px] 2xl:pt-[100px]
    "
    >
      <div className="container">
        <div className="container flex justify-center">
          <ProcessList />
        </div>
      </div>
    </section>
  );
}

export default Process;

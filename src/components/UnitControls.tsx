import React, {useEffect, useState} from "react";

const REGEX_NUMBER = /[^0-9.-]/g
const UnitControls = () => {

  const [valueInput, setValueInput] = useState<string>("1")
  const [unitOption, setUnitOption] = useState<string>("%")

  useEffect(() => {
    if(unitOption === "%" && valueInput > "100"){
      setValueInput("100")
    }
  }, [unitOption]);

  const handleChangeOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUnitOption(e.currentTarget.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(",", ".");
    if(!REGEX_NUMBER.test(inputValue)){
      inputValue = inputValue.replace(REGEX_NUMBER, "");
    }

    if (inputValue.indexOf("-") > 0) {
      inputValue = inputValue.replace("-", "");
    }

    if (inputValue.split(".").length > 2) {
      inputValue = inputValue.slice(0, inputValue.indexOf(".") + 1) + inputValue.slice(inputValue.indexOf(".") + 1).replace(".", "");
    }

    if(unitOption === "%" && inputValue > "100"){
      inputValue = "100"
    }

    setValueInput(inputValue);
  };

  // Hàm xử lý khi mất focus
  const handleBlur = () => {
    const value = valueInput;

    // Nếu giá trị bắt đầu bằng dấu `-`, giữ dấu `-` khi mất focus
    if (value && value[0] === "-") {
      const numericValue = value.replace("-", "");
      const parsedValue = parseFloat(numericValue);

      if (parsedValue < 0) {
        setValueInput("-" + parsedValue.toString());
      } else {
        setValueInput("0");
      }
    } else {
      const parsedValue = parseFloat(value);
      if (!value || parsedValue < 0) {
        setValueInput("0");
      } else {
        setValueInput(parsedValue.toString());
      }
    }
  };

  const decreaseValue = (value: string) => {
    const currentValue = Number(value);
    setValueInput(String(currentValue - 1));
  };

  const increaseValue = (value: string) => {
    const currentValue = Number(value);
    setValueInput(String(currentValue + 1));
  };


  return (
    <div className="w-full h-full bg-[#151515] p-3">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <label className="text-[#AAAAAA] text-sm ">Unit</label>
          <div className="relative flex items-center min-w-[140px] h-[36px] rounded-md bg-[#212121] px-1 overflow-hidden">
            <div
          className="absolute left-[5px] top-[2px] h-[32px] w-[67px] rounded-md bg-[#424242] transition-transform duration-300"
          style={{
            transform: unitOption !== "%" ? "translateX(100%)" : "translateX(-3%)",
          }}
        ></div>
            <button value="%" className="cursor-pointer relative z-10 min-w-[67px] h-[32px] rounded-md text-[#AAAAAA]"
                    onClick={handleChangeOption}>
              <span className="size-[12px]">%</span>
            </button>
            <button value="px" className="cursor-pointer relative z-10 min-w-[67px] h-[32px] rounded-md text-[#AAAAAA]"
            onClick={handleChangeOption}
            ><span className="size-[12px]">px</span></button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-[#AAAAAA] text-sm">Value</label>
          <div className="bg-[#212121] flex justify-between rounded-md border-transparent border-1 group focus-within:border-[#3C67FF] min-w-[140px] ">
            <button onClick={() => decreaseValue(valueInput)} disabled={valueInput === "0"}
              className="flex items-center justify-center cursor-pointer rounded-md w-[36px] h-[36px] disabled:bg-[#212121] disabled:pointer-events-none hover:bg-[#3B3B3B] hover:rounded-br-none hover:rounded-tr-none"
            >
              <span className="font-thin disabled:text-[#AAAAAA]">−</span>
            </button>
            <input type="text" value={valueInput} onBlur={handleBlur} onChange={(e) => handleInputChange(e)}
                   className="border-0 max-w-[71px] text-[#ffffff] text-center text-sm p-[5px] focus:outline-none bg-transparent" />
            <button onClick={() => increaseValue(valueInput)} disabled={valueInput === "100"}
              className="flex items-center justify-center cursor-pointer w-[36px] h-[36px] rounded-md disabled:bg-[#212121] disabled:pointer-events-none hover:bg-[#3B3B3B] hover:rounded-bl-none hover:rounded-tl-none"
            >
            <span className="font-thin disabled:text-[#AAAAAA]">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitControls;
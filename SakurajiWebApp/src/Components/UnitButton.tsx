interface UnitButtonProps {
    setUnitNumber: (number: number) => void;
    number:number
    isSelected:boolean
  }
  
  function UnitButton({ setUnitNumber,number , isSelected}: UnitButtonProps) {
    const className = `${isSelected ? 'is-selected' : ''}`;
    return (
      <button onClick={() => setUnitNumber(number) } className={className}>
        {number}
      </button>
    );
  }
  
  export default UnitButton;
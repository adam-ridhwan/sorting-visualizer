interface ColumnProps {
  value: number;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ value, index }) => {
  return <div className='column' style={{ height: value * 14 }}></div>;
};

export default Column;

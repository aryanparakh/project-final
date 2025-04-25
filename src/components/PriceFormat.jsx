const PriceFormat = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
  
  return <>{formattedPrice}</>;
};

export default PriceFormat;
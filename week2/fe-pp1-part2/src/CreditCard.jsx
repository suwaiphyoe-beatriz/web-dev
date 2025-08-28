import React from 'react';

function CreditCard({
  type,
  number,
  expirationMonth,
  expirationYear,
  bank,
  owner,
  bgColor,
  color,
}) {
  const lastFourDigits = number.slice(-4);
  const cardImage =
    type === 'Visa'
      ? './src/assets/images/visa.png'
      : './src/assets/images/master.png';
  const cardStyle = {
    backgroundColor: bgColor,
    color: color,
  };


  return (
    <div className="credit-card" style={cardStyle}>
      <img src={cardImage} alt={type} className="card-type-image" />
      <p className="card-number">•••• •••• •••• {lastFourDigits}</p>
      <div className="card-details">
        <div className="card-info-row">
          <p className="expiration-date">
            Expires {String(expirationMonth).padStart(2, '0')}/{String(expirationYear).slice(-2)}
          </p>
          <p className="bank-name">{bank}</p>
        </div>
        <p className="owner-name">{owner}</p>
      </div>
    </div>
  );
}

export default CreditCard;

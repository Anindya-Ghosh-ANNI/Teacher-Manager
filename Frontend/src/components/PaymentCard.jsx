
function PaymentCard({paidAmount, paymentDate, paymentFrom, paymentMonths}) {
  return (
    <>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">

            <div className="flex justify-between items-center">
                <span className="text-sm text-green-700 font-medium">
                Payment Date
                </span>
                <span className="text-gray-800 font-semibold">
                {paymentDate}
                </span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-sm text-green-700 font-medium">
                No. of Months
                </span>
                <span className="text-gray-800 font-semibold">
                {paymentMonths}
                </span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-sm text-green-700 font-medium">
                Paid Amount
                </span>
                <span className="text-green-700 font-bold text-lg">
                ₹{paidAmount}
                </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-green-200">
                <span className="text-sm text-green-700 font-medium">
                Payment From
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {paymentFrom}
                </span>
            </div>

            </div>
        </div>
    </>
  )
}

export default PaymentCard
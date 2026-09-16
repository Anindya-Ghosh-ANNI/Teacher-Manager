import { useLocation, useNavigate } from "react-router-dom"
import {PaymentCard} from "../../index.js"
import { useState } from "react";

function PaymentPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const {studentId, studentName} = location.state;
    const [paymentData, setPaymentData] = useState([])

    useState(()=>{
        ;( async ()=>{
            try {
                const response = await fetch(`${API_URL}/payment/get/${studentId}`);
                const data = await response.json();

                if(!response){
                    throw new Error(data.message || "Can't fetch payments data.")
                }

                console.log("Payments: ", data.data);
                setPaymentData(data.data);
            }
            catch (error) {
                console.log(error);
            }
        })()
    })

    return (
    <>
        <div className="min-h-screen bg-green-50 p-4 sm:p-6">
            <div className="max-w-3xl mx-auto">

                <button
                    onClick={() => navigate(`/teacher/home`)}
                    className="mb-6 flex items-center gap-2 px-4 py-2 bg-white text-green-700 border border-green-200 rounded-lg shadow-sm hover:bg-green-100 transition"
                >
                    ← Back
                </button>

                <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-1">
                    Payment History
                </h1>

                <p className="text-gray-500 mb-6">
                    All payments made by {studentName}
                </p>

                <div className="space-y-4">
                    {paymentData.length > 0 ? (
                    paymentData.map((ele) => (
                        <PaymentCard
                        key={ele._id}
                        paidAmount={ele.paidAmount}
                        paymentDate={ele.paymentDate}
                        paymentFrom={ele.paymentFrom}
                        paymentMonths={ele.paymentMonths}
                        />
                    ))
                    ) : (
                    <div className="bg-white border border-green-200 rounded-xl p-8 text-center shadow-sm">
                        <p className="text-gray-500">
                        No payment history available.
                        </p>
                    </div>
                    )}
                </div>

            </div>
        </div>
    </>
    )
}

export default PaymentPage
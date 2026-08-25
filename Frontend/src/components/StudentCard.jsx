
function StudentCard({name}) {
  return (
    <>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                {name?.charAt(0).toUpperCase()}
                </div>

                <div>
                <h3 className="font-semibold text-slate-800">
                    {name}
                </h3>

                <p className="text-sm text-slate-500">
                    Active Student
                </p>
                </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
                <button className="w-full rounded-lg bg-slate-800 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                View Details
                </button>
            </div>

        </div>
    </>
  )
}

export default StudentCard
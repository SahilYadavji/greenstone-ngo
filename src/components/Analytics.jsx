export default function Analytics({ volunteers }) {

  const totalVolunteers = volunteers.length;

  const approvedVolunteers = volunteers.filter(
    (item) => item.status === "approved"
  ).length;

  const pendingVolunteers = volunteers.filter(
    (item) => item.status === "pending"
  ).length;

  return (

    <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">

      <h2 className="text-3xl font-bold text-green-700 mb-8">
        NGO Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Total */}
        <div className="bg-green-100 p-6 rounded-2xl text-center">

          <h3 className="text-5xl font-bold text-green-700">
            {totalVolunteers}
          </h3>

          <p className="mt-4 text-lg">
            Total Volunteers
          </p>

        </div>

        {/* Approved */}
        <div className="bg-blue-100 p-6 rounded-2xl text-center">

          <h3 className="text-5xl font-bold text-blue-700">
            {approvedVolunteers}
          </h3>

          <p className="mt-4 text-lg">
            Approved Volunteers
          </p>

        </div>

        {/* Pending */}
        <div className="bg-yellow-100 p-6 rounded-2xl text-center">

          <h3 className="text-5xl font-bold text-yellow-700">
            {pendingVolunteers}
          </h3>

          <p className="mt-4 text-lg">
            Pending Volunteers
          </p>

        </div>

      </div>

    </div>
  );
}
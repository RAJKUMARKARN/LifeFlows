import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  return (
    <Sidebar>
      {/* Main Dashboard Content */}
      <div className="p-[5px] transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4">Life Flows</h1>
        <p>Welcome to your dashboard! The content shifts according to sidebar width.</p>

        {/* Example cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white shadow rounded">Card 1</div>
          <div className="p-4 bg-white shadow rounded">Card 2</div>
          <div className="p-4 bg-white shadow rounded">Card 3</div>
        </div>
      </div>
    </Sidebar>
  );
}

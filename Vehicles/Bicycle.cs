namespace DeveloperTest.Vehicles
{
    public class Bicycle : Vehicle
    {
        public string Model { get; set; } = null!;
        public string Type { get; set; } = null!;

        public Bicycle()
        {
            Model = "LTD";
            Type = "Mountain Bike";
        }
    }
}
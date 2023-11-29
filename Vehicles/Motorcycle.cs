namespace DeveloperTest.Vehicles
{
    public class Motorcycle : Vehicle
    {
        public string Model { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int MaxSpeed { get; set; }

        public Motorcycle()
        {
            Model = "Suzuki GSX-R 600";
            Type = "Sportbike";
            MaxSpeed = 260;
        }
    }
}
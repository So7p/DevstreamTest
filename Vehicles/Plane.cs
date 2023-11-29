namespace DeveloperTest.Vehicles
{
    public class Plane : Vehicle
    {
        public string Model { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int MaxSpeed { get; set; }

        public Plane()
        {
            Model = "Boeing 737";
            Type = "Civil";
            MaxSpeed = 840;
        }
    }
}
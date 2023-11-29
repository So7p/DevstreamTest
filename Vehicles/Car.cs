namespace DeveloperTest.Vehicles
{
    public class Car : Vehicle
    {
        public string Model { get; set; } = null!;
        public int MaxSpeed { get; set; }

        public Car()
        {
            Model = "Jaguar XE";
            MaxSpeed = 300;
        }
    }
}
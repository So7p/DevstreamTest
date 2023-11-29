using DeveloperTest.Services;
using DeveloperTest.Vehicles;

namespace DeveloperTest
{
    class Program
    {
        static void Main()
        {
            Car car = new Car();
            Bicycle bicycle = new Bicycle();
            Motorcycle motorcycle = new Motorcycle();
            Plane plane = new Plane(); 

            //  Task 3 - Functionality
            // 
            InstanceService instanceService = new InstanceService();
            IEnumerable<Vehicle> instances = instanceService.GetInstances<Vehicle>();

            Console.WriteLine("Vehicle types sorted alphabetically:");                              
            DisplayVehicleTypes(instances);

            Console.Write("\nEnter search keyword: ");
            string keyword = Console.ReadLine();
            Console.WriteLine($"\nSearch results for '{keyword}':");
            SearchTypes(instances, keyword);

            WriteInstancesToDisk(instances);

            //  Task 4 - Problem-solving
            //
            Console.WriteLine("\nEnter any string: ");
            string stringToReverse = Console.ReadLine();
            Console.WriteLine($"Reversed string: " + ReverseString(stringToReverse));

            Console.WriteLine("\nEnter any string: ");
            string stringForPalindrome = Console.ReadLine();
            bool isPalindrome = IsPalindrome(stringForPalindrome);
            Console.WriteLine($"\nIs '{stringForPalindrome}' a palindrome: {isPalindrome}");

            Console.WriteLine("\nEnter integers separated by spaces for Task 4 (e.g., 1 3 5):");
            int[] inputArray = Console.ReadLine().Split(' ').Select(int.Parse).ToArray();
            Console.WriteLine($"Missing elements: {string.Join(", ", MissingElements(inputArray))}");
        }

        static void DisplayVehicleTypes(IEnumerable<object> vehicles)
        {
            foreach (var vehicle in vehicles.OrderBy(v => v.GetType().Name))
            {
                Console.WriteLine(vehicle.GetType().Name);
            }
        }

        static void SearchTypes(IEnumerable<object> vehicles, string keyword)
        {
            foreach (var vehicle in vehicles.Where(v => v.GetType().Name.Contains(keyword)))
            {
                Console.WriteLine(vehicle.GetType().Name);
            }
        }

        static void WriteInstancesToDisk(IEnumerable<object> vehicles)
        {
            try
            {
                File.WriteAllLines("vehicle_instances.txt", vehicles.Select(v => v.GetType().Name));
                Console.WriteLine("\nVehicle instances written to disk (...\\bin\\Debug\\net7.0).");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error writing to disk: {ex.Message}");
            }
        }

        static string ReverseString(string s)
        {
            char[] charArray = s.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }

        static bool IsPalindrome(string s)
        {
            return s.SequenceEqual(s.Reverse());
        }

        static IEnumerable<int> MissingElements(int[] arr)
        {
            int min = arr.Min();
            int max = arr.Max();
            return Enumerable.Range(min, max - min + 1).Except(arr);
        }
    }
}
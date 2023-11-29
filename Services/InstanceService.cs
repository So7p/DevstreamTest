namespace DeveloperTest.Services
{
    public class InstanceService
    {
        public IEnumerable<T> GetInstances<T>() where T : class
        {
            //string targetNamespace = "DeveloperTest.Vehicles";

            /*return AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(T).IsAssignableFrom(p) && p.IsClass && !p.IsAbstract && p.GetConstructor(Type.EmptyTypes) != null && !p.ContainsGenericParameters && p.Namespace == targetNamespace)
                .Select(x => (T)Activator.CreateInstance(x));*/

            return AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(T).IsAssignableFrom(p) && p.IsClass && !p.IsAbstract && p.GetConstructor(Type.EmptyTypes) != null && !p.ContainsGenericParameters)
                .Select(x => (T)Activator.CreateInstance(x));
        }
    }
}
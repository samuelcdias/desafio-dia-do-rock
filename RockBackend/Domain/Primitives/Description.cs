namespace RockBackend.Domain.Primitives;

public class Description
{
    public string? Value { get; private set; } = null;

    private Description() { }

    public Description(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException(nameof(value));
        }
        if (value.Length > 300 || value.Length < 2)
        {
            throw new ArgumentOutOfRangeException(nameof(value));
        }
        this.Value = value;
    }
}

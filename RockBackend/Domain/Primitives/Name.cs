namespace RockBackend.Domain.Primitives;

public class Name
{
    public string? Value { get; private set; } = null;

    private Name() { }

    public Name(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException(nameof(value));
        }
        if (value.Length > 100 || value.Length < 2)
        {
            throw new ArgumentOutOfRangeException(nameof(value));
        }
        this.Value = value;
    }
}

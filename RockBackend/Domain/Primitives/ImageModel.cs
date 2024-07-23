namespace RockBackend.Domain.Primitives;

public class ImageModel
{
    public Description Url { get; private set; }
    private ImageModel() { }

    public ImageModel(string url)
    {
        Url = new Description(url);
    }
}

using System.Drawing;
namespace RockBackend.Commands;

public class ImageService
{
    void ConvertFromBase64(string base64String)
    {

        try
        {
            byte[] imageBytes = Convert.FromBase64String(base64String);

            using (MemoryStream ms = new MemoryStream(imageBytes))
            {
                Image image = Image.FromStream(ms);

                image.Save("imagem_recuperada.jpg");
            }

            Console.WriteLine("Imagem recuperada com sucesso!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao converter a imagem: {ex.Message}");
        }
    }
}

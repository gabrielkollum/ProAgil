using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class PalestranteDtos
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public string ImagemURL { get; set; }

        public string Telefone { get; set; }

        public string Email { get; set; }
        public List<RedeSocialDtos> RedesSociais { get; set; }
        public List<EventoDtos> Eventos { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class EventoDtos
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string Img { get; set; }
        public string Telefone { get; set; }

        public string Email { get; set; }

        public string Lote { get; set; }
        public List<LoteDtos> Lotes { get; set; }
        public List<RedeSocialDtos> RedesSociais { get; set; }
        public List<PalestranteDtos> Palestrantes { get; set; }
    }
}
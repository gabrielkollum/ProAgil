using System.Linq;
using AutoMapper;
using ProAgil.Domain;
using ProAgil.WebAPI.Dtos;

namespace ProAgil.WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDtos>()
            .ForMember(dest => dest.Palestrantes, opt => {
                opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Palestrante).ToList());
            }).ReverseMap();
            CreateMap<Palestrante, PalestranteDtos>()
            .ForMember(dest => dest.Eventos, opt => {
                opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Evento).ToList());
            }).ReverseMap();
            CreateMap<Lote, LoteDtos>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDtos>().ReverseMap();
        }
    }
}
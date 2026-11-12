# 038 Wi-Fi devor orqali qanday o‘tadi — sources
- Wi-Fi bands 2.4 GHz and 5 GHz; microwave oven operates at 2.45 GHz; oven is a sealed metal box, some energy escapes and disrupts 2.4 GHz Wi-Fi → https://www.scienceabc.com/innovation/do-microwaves-interfere-with-wifi-signals.html
- Microwave oven uses "800 Watts+"; leaked energy can disrupt Wi-Fi a couple of metres away; 5 GHz avoids it → https://www.ispreview.co.uk/index.php/2021/06/microwave-ovens-cause-wifi-confusion-for-uk-consumers.html
- Max 2.4 GHz Wi-Fi power in Europe (ETSI): 100 mW (20 dBm) EIRP → https://rfessentials.com/rf-knowledge-base/what-is-the-maximum-transmit-power-for-a-wi-fi-device-operating-in-each-regulato/
  - own calculation: 800 W / 0.1 W = 8 000 ("sakkiz ming barobar").
- Attenuation estimates: plasterboard 3 dB, brick wall 8 dB, concrete wall 12 dB, human body 6–15 dB; water and metal reflect Wi-Fi → https://www.networkacademy.io/ccna/wireless/radio-signals-in-real-world-environments
  - own calculation: 8 dB → 10^0.8 = 6.3× weaker ("olti barobar"); 12 dB → 10^1.2 = 15.8× ("o‘n olti barobar").
- Wavelength: own calculation λ = c/f = 300 000 km/s ÷ 2.4 GHz = 12.5 cm ("taxminan o‘n ikki santimetr").

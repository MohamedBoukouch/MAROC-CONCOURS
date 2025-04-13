export default async (req, res) => {
    const domain = 'maroconcours.space'; // ← Replace this!
    const ezoicUrl = `https://srv.adstxtmanager.com/19390/${domain}`;
    
    try {
      const response = await fetch(ezoicUrl);
      const adsText = await response.text();
      res.setHeader('Content-Type', 'text/plain');
      res.send(adsText);
    } catch (error) {
      res.status(500).send('Error fetching ads.txt');
    }
  };
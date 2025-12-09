const express = require('express');
const cors = require('cors');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();
const PORT = 3000;

// CORS 설정 (모든 출처 허용)
app.use(cors());

// JSON 파싱
app.use(express.json());

// 루트 경로
app.get('/', (req, res) => {
    res.send('KOPIS API 프록시 서버가 정상 작동중입니다! 🎭');
});

// KOPIS API 공연 목록 조회
app.get('/api/performances', async (req, res) => {
    const apiKey = req.query.apiKey;
    const stdate = req.query.stdate || '20241201';
    const eddate = req.query.eddate || '20241231';
    const cpage = req.query.cpage || '1';
    const rows = req.query.rows || '20';
    const sharea = req.query.sharea || '11'; // 11=서울
    const genre = req.query.genre || ''; // 장르 코드 (선택사항)
    
    if (!apiKey) {
        return res.status(400).json({ 
            error: 'API 키가 필요합니다',
            message: 'apiKey 파라미터를 추가해주세요' 
        });
    }
    
    try {
        // KOPIS API URL 구성
        let url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${apiKey}&stdate=${stdate}&eddate=${eddate}&cpage=${cpage}&rows=${rows}&sharea=${sharea}`;
        
        if (genre) {
            url += `&shcate=${genre}`;
        }
        
        console.log('KOPIS API 호출:', url);
        
        // KOPIS API 호출
        const response = await axios.get(url, {
            timeout: 10000, // 10초 타임아웃
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        
        // XML을 JSON으로 변환
        const parser = new xml2js.Parser({
            explicitArray: false,
            ignoreAttrs: false,
            mergeAttrs: true
        });
        
        parser.parseString(response.data, (err, result) => {
            if (err) {
                console.error('XML 파싱 오류:', err);
                return res.status(500).json({ 
                    error: 'XML 파싱 오류',
                    message: err.message 
                });
            }
            
            // 결과 확인
            if (!result || !result.dbs) {
                console.error('API 응답 오류:', result);
                return res.status(500).json({ 
                    error: 'API 응답 오류',
                    message: '공연 정보를 찾을 수 없습니다' 
                });
            }
            
            // 공연 목록 추출
            let performances = [];
            if (result.dbs.db) {
                // db가 배열이 아닐 수 있음 (1개일 때)
                performances = Array.isArray(result.dbs.db) ? result.dbs.db : [result.dbs.db];
            }
            
            console.log(`${performances.length}개의 공연 정보 조회 완료`);
            
            // 클라이언트에 전송
            res.json({
                success: true,
                count: performances.length,
                performances: performances
            });
        });
        
    } catch (error) {
        console.error('API 호출 오류:', error.message);
        
        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({ 
                error: '타임아웃',
                message: 'API 서버 응답 시간 초과' 
            });
        }
        
        res.status(500).json({ 
            error: 'API 호출 실패',
            message: error.message 
        });
    }
});

// KOPIS API 공연 상세 정보 조회
app.get('/api/performance/:id', async (req, res) => {
    const apiKey = req.query.apiKey;
    const performanceId = req.params.id;
    
    if (!apiKey) {
        return res.status(400).json({ 
            error: 'API 키가 필요합니다' 
        });
    }
    
    try {
        const url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${performanceId}?service=${apiKey}`;
        
        console.log('공연 상세 정보 조회:', url);
        
        const response = await axios.get(url, {
            timeout: 10000
        });
        
        // XML을 JSON으로 변환
        const parser = new xml2js.Parser({
            explicitArray: false,
            ignoreAttrs: false,
            mergeAttrs: true
        });
        
        parser.parseString(response.data, (err, result) => {
            if (err) {
                return res.status(500).json({ 
                    error: 'XML 파싱 오류',
                    message: err.message 
                });
            }
            
            res.json({
                success: true,
                performance: result.dbs.db
            });
        });
        
    } catch (error) {
        console.error('상세 정보 조회 오류:', error.message);
        res.status(500).json({ 
            error: '상세 정보 조회 실패',
            message: error.message 
        });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log('=================================');
    console.log('🎭 KOPIS API 프록시 서버 시작!');
    console.log(`📡 서버 주소: http://localhost:${PORT}`);
    console.log('=================================');
});

// 에러 핸들링
process.on('uncaughtException', (err) => {
    console.error('예상치 못한 오류:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('처리되지 않은 Promise 거부:', reason);
});
